
import React from 'react';

function SubHeader({Link}) {
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
        <Link view="about"> How it works </Link>page and start getting better at English today.</h2>
      </div>  
    </section>
  </div>
}

function Serial({Link, serial}) {
  return <div className="show col-md-3">
    <Link view='serial' id={serial.url}>
      <img src={"http://image.tmdb.org/t/p/w342/" + serial.tmdb.poster_path}/>
    </Link>
    <Link view='serial' id={serial.url}>
      {serial.name}
    </Link>
  </div>
}

export default function Home(props) {
  const {state, Link} = props;
  return <div>
    <SubHeader {...props}/>
    <div>
      <div className="row container show-list">
        { state.serials && state.serials.map( (serial) => <Serial key={serial.url} serial={serial} {...props}/> ) }
      </div>
    </div>
  </div>
}
