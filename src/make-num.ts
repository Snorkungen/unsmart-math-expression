export default function makeNum(str: string): number {

    return Number(str
        .replaceAll(" ", "")
        .replace(",", "."))
}