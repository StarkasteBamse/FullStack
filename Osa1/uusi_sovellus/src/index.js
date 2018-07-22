import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = props => {
    return (
        <h1>{props.kurssi}</h1>
    )
}
const Sisalto = props => {
    return (
        <div>
            <Osa o={props.osa1} />
            <Osa o={props.osa2} />
            <Osa o={props.osa3} />
        </div>
    )
}

const Osa = props => {
    return (
        <p>{props.o.nimi} {props.o.tehtavia}</p>
    )
}

const Yhteensa = props => {
    const tulos = props.t1 + props.t2 + props.t3
    return (
        <p>yhteensä {tulos} tehtävää </p>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }
    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto
                osa1={osa1}
                osa2={osa2}
                osa3={osa3}
            />
            <Yhteensa t1={osa1.tehtavia} t2={osa2.tehtavia} t3={osa3.tehtavia} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)