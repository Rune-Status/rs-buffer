import { TestFixture, TestCase, Expect } from "alsatian";

import { ReadableByteBuffer, Transformation, DataOrder } from "../../src/";

@TestFixture("ByteBuffer#readLong tests")
export class ByteBufferReadLongTestFixture {

    @TestCase([ 0x12, 0x34, 0x56, 0x78, 0x71, -0x4E, -0x3D, -0x2C ], DataOrder.BIG_ENDIAN, [ 0x12345678, 0x71B2C3D4 ])
    @TestCase([ -0x5B, 0x44, 0x33, 0x22, -0x1C, -0x2E, -0x40, -0x4E ], DataOrder.BIG_ENDIAN, [ 0xA5443322, 0xE4D2C0B2 ])
    @TestCase([ -0x2C, -0x3D, -0x4E, 0x71, 0x78, 0x56, 0x34, 0x12 ], DataOrder.LITTLE_ENDIAN, [ 0x12345678, 0x71B2C3D4 ])
    @TestCase([ -0x4E, -0x40, -0x2E, -0x1C, 0x22, 0x33, 0x44, -0x5B ], DataOrder.LITTLE_ENDIAN, [ 0xA5443322, 0xE4D2C0B2 ])
    public shouldReadLong(input: number[], order: DataOrder, expected: [number, number]) {
        const buffer = ReadableByteBuffer.fromArray(input);

        const output = buffer.readLong(Transformation.NONE, order);

        Expect(output).toEqual(expected);
    }

    @TestCase([ 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78 ], Transformation.NONE, [ 0x12345678, 0x12345678 ])
    @TestCase([ 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, -0x08 ], Transformation.ADD, [ 0x12345678, 0x12345678 ])
    @TestCase([ 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x08 ], Transformation.SUBTRACT, [ 0x12345678, 0x12345678 ])
    @TestCase([ 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, -0x78 ], Transformation.NEGATE, [ 0x12345678, 0x12345678 ])
    public shouldReadLongWithCorrectTransformation(input: number[], transformation: Transformation, expected: [number, number]) {
        const buffer = ReadableByteBuffer.fromArray(input);

        const output = buffer.readLong(transformation);

        Expect(output).toEqual(expected);
    }

    @TestCase([ 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, -0x08 ], DataOrder.BIG_ENDIAN, [ 0x12345678, 0x12345678 ])
    @TestCase([ -0x08, 0x56, 0x34, 0x12, 0x78, 0x56, 0x34, 0x12 ], DataOrder.LITTLE_ENDIAN, [ 0x12345678, 0x12345678 ])
    public shouldApplyTransformationCorrectlyWhenOrdered(input: number[], order: DataOrder, expected: [number, number]) {
        const buffer = ReadableByteBuffer.fromArray(input);

        const output = buffer.readLong(Transformation.ADD, order);

        Expect(output).toEqual(expected);
    }
}
