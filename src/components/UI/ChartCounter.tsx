type ChartCounterProps = {
  title: string;
  count: number | undefined;
};

const ChartCounter = ({ title, count }: ChartCounterProps) => {
  return (
    <div className="font-inter w-[164px] h-[144px] shadow-custom-shadow px-2 py-2">
      <div className="text-main-blue text-base font-medium">
        <h2>{title}</h2>
      </div>
      <div className="pt-6">
        <h3 className="text-main-blue font-medium text-[28px] text-center">
          {count}
        </h3>
      </div>
    </div>
  );
};

export default ChartCounter;
