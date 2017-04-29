import { TestFixture, TestCase, Test, Expect } from "alsatian";

import { WritableByteBuffer } from "../../../src/byte-buffer";

@TestFixture("ByteBuffer#getPosition tests")
export class ByteBufferGetPositionTestFixture {

    @TestCase(1)
    @TestCase(2)
    public shouldGetPositionAfterSet(position: number) {
        const byteBuffer = new WritableByteBuffer();

        // push enough bytes to set the position
        for (let i = 0; i < position; i++) {
            byteBuffer.pushByte(0xFF);
        }

        // push one more so we're not just setting to the end
        byteBuffer.pushByte(0xFF);

        byteBuffer.setPosition(position);

        Expect(byteBuffer.getPosition()).toEqual(position);
    }

    @TestCase(1)
    @TestCase(2)
    public shouldGetPayloadLengthByDefault(length: number) {
        const byteBuffer = new WritableByteBuffer();

        // push enough bytes to set the position
        for (let i = 0; i < length; i++) {
            byteBuffer.pushByte(0xFF);
        }

        Expect(byteBuffer.getPosition()).toEqual(length);
    }

}