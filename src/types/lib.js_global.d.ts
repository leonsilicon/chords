export {}
declare global {

    /** global object Console
     * @param log (...args: any[]) Print the arguments separated by spaces and a trailing newline.
     */
    interface Console {
        log(...args: any[]): void;
    }
    //global object console
    var console: Console;
    //Provides the executable path.
    const argv0: string;
    //Provides the command line arguments. The first argument is the script name.
    const scriptArgs: string[];
    //Print the arguments separated by spaces and a trailing newline.
    function print(...args: any[]):void;

    /** global object navigator
     * @param userAgent Returns quickjs-ng/<version>.
     */
    interface Navigator {
        userAgent:string;
    }
    const navigator: Navigator;
    //Shorthand for std.gc().
    function gc():void;
}
