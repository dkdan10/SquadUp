
export const hours12 = (date) => {
     return (date.getHours() + 24) % 12 || 12;
}
