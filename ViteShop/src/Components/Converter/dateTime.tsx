export default function DateTimeConverter(rawValue: Date) {
    return new Date(rawValue).toDateString();
}
  