/* eslint-disable @typescript-eslint/no-explicit-any */

function DateFormat({ date }: {date: string}) {

  return (
    <div>
      {date.slice(0, 10)}
    </div>
  );

}

export default DateFormat
