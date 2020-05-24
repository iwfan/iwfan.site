const dataTimeFormat = new Intl.DateTimeFormat(`zh-CN`, {
  year: `numeric`,
  month: `2-digit`,
  day: `2-digit`,
});

export const format = (timestamp: string): string => {
  return dataTimeFormat.format(new Date(timestamp)).replace(/\//g, `-`);
};
