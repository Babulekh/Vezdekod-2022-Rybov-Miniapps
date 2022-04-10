import React from 'react';
import PropTypes from 'prop-types';

import { Div, Button } from '@vkontakte/vkui';

const Cards = ({ onClick, text }) => (
    <Div>
        <Button stretched size="l" mode="secondary" onClick={onClick}>
            {text}
        </Button>
    </Div>
);

Cards.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default Cards;
