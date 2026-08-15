import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const gdpValues = [500000, 800000, 1200000, 1600000];

const getRecentMonthLabels = (count: number) => {
  const currentMonth = new Date();
  currentMonth.setDate(1);

  return Array.from({ length: count }, (_, i) => {
    const date = new Date(currentMonth);
    date.setMonth(currentMonth.getMonth() - (count - i - 1));

    return date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
  });
};

const monthLabels = getRecentMonthLabels(gdpValues.length);

const data = gdpValues.map((value, i) => ({
  name: monthLabels[i],
  value,
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#222] px-3 py-1.5 rounded text-xs text-[#aaa] border border-[#333] transform -translate-y-4">
        $ {payload[0].value.toLocaleString()}
      </div>
    );
  }
  return null;
};

const GdpGraphCard = () => {
  const [activeIndex, setActiveIndex] = useState(data.length - 1);

  const currentItem = data[activeIndex] || data[data.length - 1];
  const prevItem = data[activeIndex - 1];

  const percentage = prevItem
    ? ((currentItem.value - prevItem.value) / prevItem.value) * 100
    : 0;

  const isPositive = percentage >= 0;
  const gdpValue =
    currentItem.value >= 1000000
      ? `${(currentItem.value / 1000000).toLocaleString(undefined, {
          maximumFractionDigits: 1,
        })}m`
      : `${(currentItem.value / 1000).toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}k`;

  return (
    <div className="bg-[#0F0F0F] rounded-2xl md:p-8 p-4 h-full flex flex-col relative overflow-hidden">
      <style>{`
        .recharts-wrapper {
          outline: none !important;
        }
      `}</style>
      <div className="flex justify-between items-start mb-4 z-10 w-full">
        <div className="text-heading-7 md:text-heading-6 md:!text-[25px] !font-medium">
          <div className="text-white">${gdpValue}+ in</div>
          <div className="text-[#5F5F5F]">Community GDP</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2 text-xs justify-self-end">
          <span
            className={`px-2 py-1 rounded flex items-center gap-1 ${
              isPositive
                ? "bg-[#1A1A1A] text-[#00AD66]"
                : "bg-[#1A1A1A] text-red-500"
            }`}
          >
            <svg
              className={`w-3 h-3 ${!isPositive ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            {Math.abs(percentage).toFixed(2)}%
          </span>
          <span className="text-[#555]">vs Last Month</span>
        </div>
      </div>

      <div className="flex-1 w-full relative min-h-[200px] md:-ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            onMouseMove={(state: any) => {
              if (state && state.activeTooltipIndex !== undefined) {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => {
              setActiveIndex(data.length - 1);
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00AD66" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00AD66" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              vertical={true}
              stroke="#222"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#444", fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={false} // We handle the dot effectively via the activeDot prop on Area if needed, or custom cursor logic
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00AD66"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{
                r: 4,
                fill: "#00AD66",
                stroke: "#fff",
                strokeWidth: 1,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GdpGraphCard;
