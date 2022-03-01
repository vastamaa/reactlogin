import React, {useEffect, useState} from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { fetchHitelesitessel } from './AuthService';
import {Kijelentkezes} from './Kijelentkezes';


export function SzallasLista() {
const [szallasok, setSzallasok] = useState([]);
const [isPending, setPending] = useState(false);
const history = useHistory();

useEffect(() => {
    setPending(true);
    fetchHitelesitessel
    .get("https://kodbazis.hu/api/szallasok")
    .then((res) => res.data)
    .then((tartalom) =>{
        setPending(false);
        setSzallasok(tartalom);
    })
    .catch(() => {
        setPending(false);
        history.push("/");
    });
}, [history]);

if(isPending || !szallasok.length){
    return(
        <div className="center-item">
            <div className="spinner-border text-danger"></div>
        </div>
    );
}

return(
    <div>
        <Kijelentkezes />
        <ul className="list-group w-100">
            <div className='row border-bottom border-top p-2 text-danger'>
                <h5 className="col-xs-12 col-sm-4">Megnevezés:</h5>
                <h5 className="col-xs-12 col-sm-2 right">Helyszín:</h5>
                <h5 className="col-xs-8 col-sm-3">Minimum éjszakák száma:</h5>
                <h5 className="col-xs-10 col-sm-3">Ár:</h5>
            </div>
        </ul>
        {szallasok.map((szallas) => (
            <NavLink key={szallas.id} to={"/szallas-" + szallas.id}>
                <div className="row border-bottom p-2 text-dark">
                    <div className="col-xs-12 col-sm-4">
                        <h4 className="visible-xs">{szallas.name}</h4>
                        <span className="hidden-xs">{szallas.host_name}</span>
                    </div>
                    <div className="col-xs-4 col-sm-2 right">
                        {szallas.neighbourhood} {szallas.neighbourhood_group}
                    </div>
                    <div className="col-xs-8 col-sm-3">{szallas.minimum_nights}</div>
                    <div className="col-xs-10 col-sm-2">{szallas.price}$</div>
                </div>
            </NavLink>
        ))}
    </div>
);
}

