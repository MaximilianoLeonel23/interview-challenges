interface Props {
  score: {
    success: number;
    mistakes: number;
  };
}

function ScoreTable({ score }: Props) {
  return (
    <table className="nes-table is-bordered is-centered">
      <thead>
        <tr>
          <th>Success</th>
          <th>Mistakes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{score?.success}</td>
          <td>{score?.mistakes}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ScoreTable;
