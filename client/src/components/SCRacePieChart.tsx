import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';



const COLORS = ['#0088FE', '#9005a6', '#069401'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface RaceData{
    name: string,
    value: number;
}

type state = {
    genderArr: RaceData[];
}


type chartProps = {
    data: RaceData[];
    
}


export default class SCRacePieChart extends PureComponent<chartProps, state>{


  render() {
    return (
      <ResponsiveContainer width={250} height={250}>
        <PieChart width={200} height={200}>
          <Pie
            data={this.props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            
          >
            {this.props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            
          </Pie>
          <Tooltip formatter={(value: any, name: any, props: any) => [value]} />
          <Legend margin={{ top: 0, left: 0, right: 0, bottom: 0 }} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}