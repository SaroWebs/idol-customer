import React from 'react'
import { useParams } from 'react-router-dom';
import MasterLayout from '../Layouts/MasterLayout';
import ShowPrescription from '../Components/ShowPrescription';

const Prescription = () => {
    const { code } = useParams();


    return (
        <MasterLayout title="Prescription">
            <ShowPrescription code={code} />
        </MasterLayout>
    )
}

export default Prescription