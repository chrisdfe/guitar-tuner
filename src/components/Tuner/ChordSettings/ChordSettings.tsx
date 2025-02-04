import styles from './ChordSettings.module.scss';

interface Props {
  fretsToShow: number;
  setFretsToShow: (frets: number) => void;
}

const ChordSettings = ({ fretsToShow, setFretsToShow }: Props) => {
  return (
    <div className={styles.panel}>
      <label htmlFor="frets-to-show"># of frets</label><br />
      <input
        type="number"
        value={fretsToShow}
        id="frets-to-show"
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);

          setFretsToShow(value);
        }} />
    </div>
  );
};

export default ChordSettings;