'use client';
import { useState } from 'react';

export function ChampionsStatisticsControl({ children, puuid }: { children: React.ReactNode; puuid: string }) {
  const [selected_queue_id, set_selected_queue_id] = useState('420');
  function select_stat_queue(queue_id: string) {
    if (selected_queue_id !== queue_id) {
      console.log('button pressed', queue_id);
      var old_stat = document.getElementById(`stats_queueId_${selected_queue_id}`);
      if (old_stat !== null) {
        old_stat.classList.add('hidden');
      }
      var old_stat_button = document.getElementById(`stats_queueId_button_${selected_queue_id}`);
      if (old_stat_button !== null) {
        old_stat_button.classList.remove('backdrop-brightness-75');
      }

      var new_stat = document.getElementById(`stats_queueId_${queue_id}`);
      if (new_stat !== null) {
        new_stat.classList.remove('hidden');
      }
      var new_stat_button = document.getElementById(`stats_queueId_button_${queue_id}`);
      if (new_stat_button !== null) {
        new_stat_button.classList.add('backdrop-brightness-75');
      }

      set_selected_queue_id(queue_id);
    }
  }
  return (
    <div className="flex flex-col backdrop-brightness-75 rounded-md p-2">
      <div className="flex flex-row justify-around items-stretch">
        <ChampionStatisticsButton
          text="Solo"
          queue_id="420"
          classes="backdrop-brightness-75"
          select_stat_queue={select_stat_queue}
        ></ChampionStatisticsButton>
        <ChampionStatisticsButton
          text="Flex"
          queue_id="440"
          classes=""
          select_stat_queue={select_stat_queue}
        ></ChampionStatisticsButton>
        <ChampionStatisticsButton
          text="All SR"
          queue_id="0"
          classes=""
          select_stat_queue={select_stat_queue}
        ></ChampionStatisticsButton>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function ChampionStatisticsButton({
  text,
  queue_id,
  classes,
  select_stat_queue,
}: {
  text: string;
  queue_id: string;
  classes: string;
  select_stat_queue: Function;
}) {
  return (
    <button
      id={`stats_queueId_button_${queue_id}`}
      onClick={() => select_stat_queue(queue_id)}
      className={`rounded-lg px-4 py-2 ${classes}`}
    >
      <p className="text-lg">{text}</p>
    </button>
  );
}
