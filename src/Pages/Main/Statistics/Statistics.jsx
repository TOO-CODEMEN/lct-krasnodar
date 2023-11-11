import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Legend, Tooltip, Cell, ResponsiveContainer } from "recharts";
import styles from './Statistics.module.scss'
import { Box, LinearProgress, Typography } from "@mui/material";
import { formatTimestamp } from "../../../utils/formatTimestamp";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} style={{ backgroundColor: '#E55C78' }} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Statistics() {

  const user = useSelector((state) => state.user.currentUser)
  console.log(user)

  const data02 = [
    { name: "Выполненные задачи", value: user.completedTasks + 2 },
    { name: "Невыполненных задач", value: user.failedTasks + 1 },
  ];

  const countTasks = user.completedTasks + 2 + user.failedTasks + 1
  const percentCompletedTasks = (user.completedTasks + 2 / countTasks) * 100
  const COLORS = ['green', '#E55C78'];

  return (
    <div className={styles.statistics}>
      <div className={styles.statistics__title}>
        Статистика
      </div>
      {Object.keys(user).length > 0 ?       <div className={styles.statistics__metrika}>
        <div className={styles.statistics__metrika__left}>
          <div className={styles.statistics__metrika__left__text}>Задачи</div>
          <PieChart width={400} height={200}>
            <Pie
              dataKey="value"
              data={data02}
              cx={200}
              labelLine={false}
              cy={100}
              innerRadius={40}
              outerRadius={80}
              fill="#E55C78"
            >
              {data02.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>


        <div className={styles.statistics__metrika__right}>
          <div className={styles.statistics__metrika__right__text}>
            Прогресс
          </div>

          <div className={styles.statistics__metrika__right__progress}>
            <LinearProgressWithLabel value={percentCompletedTasks} />
          </div>

          <div className={styles.statistics__metrika__right__important}>
            Курс необходимо закончить до: <span>{formatTimestamp(user.finishTime)}</span>
          </div>
        </div>
      </div> : <div>Ошибка</div>}
    </div>
  );
}
