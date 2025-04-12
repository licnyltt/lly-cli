import logSymbols from 'log-symbols';


export const log = (message?: string) => {
    if (message !== (void 0)) {
        console.log(message);
    } else {
        console.log();
    }
};
log.error = (message: string | unknown) => {
    console.log(logSymbols.error, message)
};
log.info = (message: string) => {
    console.log(logSymbols.info, message)
};
log.success = (message: string) => {
    console.log(logSymbols.success, message)
};
log.warning = (message: string) => {
    console.log(logSymbols.warning, message)
};