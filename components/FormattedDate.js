import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const FormattedDate = ({ date }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return <Text>{formatDate(date)}</Text>;
};

FormattedDate.propTypes = {
    date: PropTypes.string.isRequired,
};

export default FormattedDate;