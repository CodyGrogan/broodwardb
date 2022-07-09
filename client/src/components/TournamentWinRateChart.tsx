import { type } from 'os';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface Matchup {
  name: string;
  value: number;

}

interface WinRateData{
    tvz: number,
    tvp: number,
    pvz: number
}
type state = {
  genderArr: Matchup[];
}


type MatchupBarChartProps = {
  data: Matchup[];
}

// TvT, TvP, TvZ, PvZ, PvP, ZvZ
const COLORS = ['#09bdb1', "#800d4a", "#719400"];

export default class TournamentWinRateChart extends PureComponent<MatchupBarChartProps, state> {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  /*
  constructor(props: MatchupBarChart){
    super(props);
  }
  */
  render() {
    return (
      <ResponsiveContainer width={'100%'} height={350}>
        <BarChart
          
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 100]}  />
          <Tooltip />
         
          <Bar dataKey="value" >
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}