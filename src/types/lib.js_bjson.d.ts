declare module "qjs:bjson" {
    //allow serializing functions and modules
    export const WRITE_OBJ_BYTECODE: number;
    //allow serializing object references
    export const WRITE_OBJ_REFERENCE: number;
    //allow serializing SharedArrayBuffer instances
    export const WRITE_OBJ_SAB: number;
    //strip debugging information when serializing
    export const WRITE_OBJ_STRIP_DEBUG: number;
    //strip the source information when serializing
    export const WRITE_OBJ_STRIP_SOURCE: number;

    enum writeflag {
        WRITE_OBJ_BYTECODE,
        WRITE_OBJ_REFERENCE,
        WRITE_OBJ_SAB,
        WRITE_OBJ_STRIP_DEBUG,
        WRITE_OBJ_STRIP_SOURCE
    }
    //Serializes the given object into the QuickJS internal serialization format. Returns an ArrayBuffer with the serialized data.
    export function write(obj: object, flags?: writeflag) : ArrayBuffer;

    //allow de-serializing functions and modules
    export const READ_OBJ_BYTECODE: number;
    //allow de-serializing object references
    export const READ_OBJ_REFERENCE: number;
    //allow de-serializing SharedArrayBuffer instances
    export const READ_OBJ_SAB: number;
    enum readflag {
        READ_OBJ_BYTECODE,
        READ_OBJ_REFERENCE,
        READ_OBJ_SAB,
    }
    //De-serialize the given ArrayBuffer (in QuickJS internal serialization format) back into a JavaScript value.
    export function read(buf: ArrayBuffer,pos?: number,len?: number, flags?: readflag): object;
}
