
import React from 'react';

function SubHeader(state, actions) {
  return <div>
    <section id="header">
      <div className="row">
        <div className="col-md-4">
          <img src="/img/sam.png" className="sam pull-right" alt=""/>
        </div>
        <div className="col-md-8 text-center">
          <h2>english motherfucker!<br/>do you speak it?</h2>
          <p>-linguahack.tv-</p>
          <div className="media clearfix">
            <a href="" className=" soc twitter"></a>
            <a href="" className=" soc fb"></a>
            <a href="" className=" soc vk"></a>
          </div>
        </div>
      </div>
    </section>
    <section className="about">
      <div className="container">
        <h2>Learning English can be fun and addictive! Check out our 
        <a href="/about" onClick={actions.Link('about')}> How it works </a>page and start getting better at English today.</h2>
      </div>  
    </section>
  </div>
}

function Serial(serial, link) {
  return <div className="show col-md-3" key={serial.url}>
    <a href="" onClick={link}>
      <img src={"http://image.tmdb.org/t/p/w342/" + serial.tmdb.poster_path}/>
    </a>
    <a href="" onClick={link}>
      {serial.name}
    </a>
  </div>
}

export default function Home(state, actions) {
  return <div>
    { SubHeader(state, actions) }
    <div>
      <div className="row container show-list">
        { state.serials && state.serials.map( (serial) => Serial(serial, actions.Link('serial', {url: serial.url})) ) }
      </div>
    </div>
  </div>
}
