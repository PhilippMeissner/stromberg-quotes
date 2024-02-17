import {FunctionalComponent, h} from 'preact';
import {useEffect} from 'preact/compat';

const Imprint: FunctionalComponent = () => {
  useEffect(() => window.scrollTo({top: 0, behavior: 'smooth'}), []);

  return (
    <div className={"text-white p-20 h-screen"}>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG:</h2>
      <p>Philipp Mei&szlig;ner<br />
        Steinstr. 26<br />
        24118 Kiel</p>
      <br />
      <h2>Kontakt:</h2>
      <p>Telefon: 01724173337<br />
        E-Mail: <a className="underline" href="mailto:admin@philippmeissner.dev">admin@philippmeissner.dev</a></p>

      <br />
      <h2>Redaktionell verantwortlich:</h2>
      <p>Die dargestellten Zitate stammen von der &ouml;ffentlichen API <a
        className="underline"
        href="https://stromberg-api.de">https://stromberg-api.de</a>.
        Die Verantwortlichen f&uuml;r diese Inhalte k&ouml;nnen hier eingesehen werden: <a
          className="underline"
          href="https://stromberg-api.de/Impressum">https://stromberg-api.de/Impressum</a></p>

      <br />
      <p>Quelle: <a
        className="underline"
        href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a>
      </p>
    </div>
  );
};

export default Imprint;
