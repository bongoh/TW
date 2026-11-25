# Pure Python PNG reader & writer with transparency extraction
import zlib, struct

def read_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    idx = 8
    idat = []
    width = height = None
    color_type = None
    while idx < len(data):
        length, ctype = struct.unpack('>I4s', data[idx:idx+8])
        idx += 8
        cdata = data[idx:idx+length]
        idx += length + 4 # skip crc
        if ctype == b'IHDR':
            width, height, bit_depth, color_type = struct.unpack('>IIBB', cdata[:10])
            assert bit_depth == 8
        elif ctype == b'IDAT':
            idat.append(cdata)
        elif ctype == b'IEND':
            break

    decompressed = zlib.decompress(b''.join(idat))
    bytes_per_pixel = 4 if color_type == 6 else 3
    stride = width * bytes_per_pixel

    # Unfilter
    pixels = bytearray(width * height * 4)
    raw_idx = 0
    prev_row = bytearray(stride)

    for y in range(height):
        filter_type = decompressed[raw_idx]
        raw_idx += 1
        curr_row = bytearray(decompressed[raw_idx:raw_idx+stride])
        raw_idx += stride

        if filter_type == 1: # Sub
            for i in range(bytes_per_pixel, stride):
                curr_row[i] = (curr_row[i] + curr_row[i - bytes_per_pixel]) & 0xFF
        elif filter_type == 2: # Up
            for i in range(stride):
                curr_row[i] = (curr_row[i] + prev_row[i]) & 0xFF
        elif filter_type == 3: # Average
            for i in range(stride):
                a = curr_row[i - bytes_per_pixel] if i >= bytes_per_pixel else 0
                b = prev_row[i]
                curr_row[i] = (curr_row[i] + ((a + b) >> 1)) & 0xFF
        elif filter_type == 4: # Paeth
            for i in range(stride):
                a = curr_row[i - bytes_per_pixel] if i >= bytes_per_pixel else 0
                b = prev_row[i]
                c = prev_row[i - bytes_per_pixel] if i >= bytes_per_pixel else 0
                p = a + b - c
                pa = abs(p - a)
                pb = abs(p - b)
                pc = abs(p - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                curr_row[i] = (curr_row[i] + pr) & 0xFF

        prev_row = curr_row

        # Copy into RGBA pixels
        out_base = y * width * 4
        if color_type == 6: # RGBA
            pixels[out_base:out_base+width*4] = curr_row
        elif color_type == 2: # RGB
            for x in range(width):
                r = curr_row[x*3]
                g = curr_row[x*3+1]
                b = curr_row[x*3+2]
                pixels[out_base + x*4] = r
                pixels[out_base + x*4 + 1] = g
                pixels[out_base + x*4 + 2] = b
                pixels[out_base + x*4 + 3] = 255

    return width, height, pixels

def write_png(path, width, height, pixels):
    # pixels is RGBA bytearray
    raw = bytearray()
    for y in range(height):
        raw.append(0) # filter 0 (None)
        start = y * width * 4
        raw.extend(pixels[start:start+width*4])

    compressed = zlib.compress(bytes(raw), 6)

    def make_chunk(ctype, cdata):
        length = struct.pack('>I', len(cdata))
        crc = struct.pack('>I', zlib.crc32(ctype + cdata) & 0xffffffff)
        return length + ctype + cdata + crc

    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    out = b'\x89PNG\r\n\x1a\n'
    out += make_chunk(b'IHDR', ihdr_data)
    out += make_chunk(b'IDAT', compressed)
    out += make_chunk(b'IEND', b'')

    with open(path, 'wb') as f:
        f.write(out)

if __name__ == '__main__':
    w, h, p = read_png('/private/tmp/tw_armor_imgs/image4.png')
    print(f'Successfully read image4: {w}x{h}, {len(p)} bytes')
