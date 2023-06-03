import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import dayjs from 'dayjs';
// import medic from '../assets/medicSeedPractice'

import { QUERY_MEDICS } from '../utils/queries';
import { UPDATE_MED } from '../utils/mutations';


import logo from '../assets/Asset1.svg';

const styles = {
    centered: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    todaysMeds: {
        width: '30%',
        display: 'flex',
    },
    form: {
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        justifyContent: 'space-around',
        borderRadius: '0%',
        alignItems: 'center',
        width: '97.6%'
    },
    borderSides: {
        width: '1.2%',
        // height: '400px',
        backgroundImage: 'linear-gradient(rgba(36, 135, 255, 0) 2%, rgb(36, 135, 255) 20%, rgb(41, 227, 0) 80%, rgba(41, 227, 0, 0) 98%)',
    },
    eachMed: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        backgroundImage: 'linear-gradient(45deg, rgb(36, 135, 255), rgb(77, 204, 255)',
        borderRadius: '5px',
        margin: '10px',
        color: 'white'
    },
    checkbox: {
        // 'appearance': 'none',
        accentColor: 'rgb(14, 56, 107)',
        color: 'rgb(41, 227, 0)',
        height: '20px',
        width: '20px',
        border: '2px, black, solid',
        borderRadius: '50%',
        background: 'white',
        ':focus': {
            color: 'rgb(150, 239, 116)'
        }
    },
}

function TodaysMeds() {
    const [err, setErr] = useState(false)
    const [medicForToday, setMedicForToday] = useState([])
    const [formState, setFormState] = useState({
        amount: '',
        everyOtherTime: ''
    })
    
    const { medicId } = useParams();

    const { loading, data } = useQuery(QUERY_MEDICS, {
        // pass URL parameter
        variables: { medicId: medicId },
    });

    const medic = data?.medic || [];

    if (loading) {
        return <div>Loading...</div>;
    }


    for (let i = 0; i < medic.length; i++) {

        if (medic[i].everyOtherTime !== null) {
            setFormState.everyOtherTime(!medic[i].everyOtherTime)
        }
            if (medic[i].everyOtherTime !== false && (medic.range === 'day' || (medic.range === 'week' && dayjs().day() === dayjs().day(medic[i].dayOfWeek)) || (medic.range === 'month' && dayjs().date() === dayjs().date(medic[i].dayOfMonth)))) {
                setMedicForToday.push(medic[i])
        //         setFormState.amount(medic[i].amount - 1);
    

        //         const [updateMed, { error, data }] = useMutation(UPDATE_MED)

        //     const updateAmountAndEOT = async () => {

        //     try {
        //         const { data } = await updateMed({
        //             variables: { ...formState },
        //         });
    
        //         Auth.login(data.addUser.token);
        //         setErr(false);
        //     } catch (e) {
        //         console.error(e);
        //         setErr(true)
        //     }
        // }
        // updateAmountAndEOT()
        }
    }
    return (
        <div style={styles.centered}>
            <h1>Today's Medication</h1>
            <img style={{ height: '100px' }} alt="logo" src={logo} />
            <div style={styles.todaysMeds}>
                <div style={styles.borderSides}></div>
                <form style={styles.form}>
                    {medicForToday.map((medic) => (
                        <div style={styles.eachMed}>
                            <label id={medic.name} style={styles.label}>
                                <h3>{medic.name}</h3>
                                <p>{medic.dosage}</p>
                            </label>
                            <input htmlfor={medic.name} type='checkbox' style={styles.checkbox} />
                        </div>
                    ))}
                </form>
                <div style={styles.borderSides}></div>
            </div>
        </div>
    )
}

export default TodaysMeds;