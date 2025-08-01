export function generateID() {
    const digits = '0123456789ABCDEF'.split('');
    let key = Math.floor(Math.random() * 10 ** 10);
    let id = '';
    while (key > 0) {
        id = digits[key % 16] + id;
        key = Math.floor(key / 16);
    }
    return id.padStart(9, '0');
}
