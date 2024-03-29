import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY" date={exp.from} />
        -
        {' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="DD/MM/YYYY" date={exp.to} />
        )}
      </td>
      <td>
        <button onClick={() => deleteExperience(exp._id)} className="btn btn-danger" type="button"> Delete </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className="my-2">
        Experience Credentials
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
