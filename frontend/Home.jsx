import React from 'react';

const Home=()=>{
  return(
    <div className="flex flex-col items-center justify-center h-[83vh] text-center px-4">
      <div className="border-1 border-green-700 rounded-3xl p-23 shadow-lg hover:shadow-xl transition-all duration-100">
        <h1 className="text-3xl font-bold mb-3 text-blue-950 hover:text-green-600 hover:scale-103 transition duration-300">Mirësevini në Platformën tonë!</h1>
        <p className="max-w-3xl text-lg text-blue-955 hover:text-green-600">
          Ju prezantojmë me krenari ndeshjet e ardhshme të Kombëtares sonë,<br/>
          si dhe përgatituni të përjetoni emocione <br/>
                  dhe gëzime të paharrueshme për kombëtaren tonë.
</p>
      </div>
    </div>
  );
};
export default Home;
