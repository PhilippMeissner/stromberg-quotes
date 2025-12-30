import { FC, useEffect } from 'react';

const Imprint: FC = () => {
  useEffect(() => window.scrollTo({top: 0, behavior: 'smooth'}), []);

  return (
    <div className={"text-white p-20 h-screen"}>
      <h1>Impressum</h1>
      <br />

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>Philipp Mei&szlig;ner<br />
        Steinstr. 26<br />
        24118 Kiel
      </p>
      <br />

      <h2>Kontakt</h2>
      <p>E-Mail: admin@philippmeissner.dev</p>
      <p>GitHub: <a rel="nofollow noopener noreferrer" target="_blank" href="https://github.com/philippmeissner">github.com/philippmeissner</a></p>
      <br />

      <h2>Redaktionell verantwortlich</h2>
      <p>Die dargestellten Zitate stammen von der &ouml;ffentlichen API &quot;https://stromberg-api.de&quot;. Die
        Verantwortlichen f&uuml;r diese Inhalte k&ouml;nnen hier eingesehen werden: <a
          rel="nofollow noopener noreferrer" target="_blank"
          href="https://stromberg-api.de/Impressum">https://stromberg-api.de/Impressum</a></p>

      <p>Quelle: <a
        rel="nofollow noopener noreferrer" target="_blank"
        href="https://www.e-recht24.de/impressum-generator.html">https://www.e-recht24.de/impressum-generator.html</a>
      </p>
    </div>
  );
};

export default Imprint;
