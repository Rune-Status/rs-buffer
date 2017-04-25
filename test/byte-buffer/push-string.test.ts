import { TestFixture, TestCase, Test, Expect } from "alsatian";

import { ByteBuffer } from "../../src/byte-buffer";

const EOL_CHARACTER = 0x0A;

@TestFixture("ByteBuffer#pushString tests")
export class ByteBufferPushStringTestFixture {

  @TestCase("hello", [ 0x68, 0x65, 0x6C, 0x6C, 0x6F, EOL_CHARACTER ])
  @TestCase("bob johnny", [ 0x62, 0x6F, 0x62, 0x20, 0x6A, 0x6F, 0x68, 0x6E, 0x6E, 0x79, EOL_CHARACTER ])
  public shouldPushCorrectBytes(value: string, expected: Array<number>) {
    const buffer = new ByteBuffer();

    buffer.pushString(value);

    Expect(buffer.getPayload()).toEqual(expected);
  }

}