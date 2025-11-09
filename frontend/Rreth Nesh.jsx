import React from 'react';

const RrethNesh = () => {
  const socialLinks = [
    {name: 'Facebook', url: 'https://www.facebook/ffk-kosovo.com'},
    {name: 'Instagram', url: 'https://www.instagram/ffk-kosovo.com'},
    {name: 'Twitter', url: 'https://twitter/ffk-kosovo.com'},
    {name: 'Email', url: 'https://mail.info@kombetarja-ffk.com'},
  ];
  return(
    <div className="h-[93.99vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4 text-center">
      <div className="border border-green-800 rounded-4xl p-10 shadow-lg hover:shadow-xl transition-all duration-200 min-w-x1">
        <h1 className="text-3xl font-bold mb-4 text-blue-950 hover:text-green-600 hover:scale-105 transition duration-300">Të gjitha informatat rrethë platformes sonë!</h1>
        <p className="max-w-3xl text-lg text-blue-900 hover:text-green-600 transition-all duration-300"> Ne jemi të përkushtuar në promovimin e futbollit tonë kombëtar!<br/> 
          Platforma jonë ofron informacione të përditësuara mbi ndeshjet, lojtarët, dhe aktivitetet e Kombëtares sonë.<br/> 
          Nëse dëshironi të qëndroni të informuar për qdo ndeshje, lojtarë, lajmë apo qfardo aktiviteti nga kombetarja jonë atëher platforma jonë është ideale për këto detaje.
            <br/> 
            Po ashtu, nëse dëshironi të na kontaktoni për ndonjë pyetje, paqartësi apo sugjerim, mund të na gjeni në rrjetet sociale ose të na dërgoni një email.<br/>
            Ne jemi këtu për t'ju ndihmuar dhe për të siguruar që ju të keni një përvojë të shkëlqyer në platformën tonë!<br/>
            Me respekt stafi i Kombëtares së Futbollit të Kosovës.
        </p>
        <div className="mt-6 flex justify-center gap-6">
          {socialLinks.map(({ name, url })=>(
            <a key={name}
              href={url} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 border border-blue-900 rounded-full text-blue-900 font-semibold hover:bg-green-600 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer"> {name}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RrethNesh;
