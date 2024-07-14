export default function monthConverter(month:number) {
    const date = new Date();
    date.setMonth(month - 1); //month is 0-indexed
  
    return date.toLocaleString("default", { month: "long" });
  }
  