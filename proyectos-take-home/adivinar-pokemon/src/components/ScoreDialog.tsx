interface Props {
  dialog: {
    message: string;
    show: boolean;
  };
}
function ScoreDialog({ dialog }: Props) {
  return (
    <div className={`score_dialog ${dialog?.show ? "visible" : "invisible"}`}>
      <section className="message -left">
        <div className="nes-balloon from-left">
          <p>{dialog?.message}</p>
        </div>
      </section>
    </div>
  );
}

export default ScoreDialog;
