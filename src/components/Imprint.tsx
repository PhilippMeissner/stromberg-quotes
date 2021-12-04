import {FunctionalComponent, h} from 'preact';

const Imprint: FunctionalComponent = () => {
  return (
    <div className={"text-white p-20 h-screen"}>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>Philipp Mei&szlig;ner<br />
        Steinstr. 26<br />
        24118 Kiel</p>

      <h2>Kontakt</h2>
      <p>Telefon: 01724173337<br />
        E-Mail: admin@philippmeissner.dev</p>

      <h2>Redaktionell verantwortlich</h2>
      <p>Die dargestellten Zitate stammen von der &ouml;ffentlichen API &quot;https://stromberg-api.de&quot;. Die Verantwortlichen f&uuml;r diese Inhalte k&ouml;nnen hier eingesehen werden: <a href="https://stromberg-api.de/Impressum">https://stromberg-api.de/Impressum</a></p>

      <p>Quelle: <a href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a></p>
    </div>
  );
};

export default Imprint;
