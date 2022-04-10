import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group } from '@vkontakte/vkui';

import Cards from '../components/Cards.js';

const EndGame = ({ id }) => (
    <Panel id={id}>
        <PanelHeader>Конец игры</PanelHeader>
        <Group>
            <Cards cards={['Игра окончена']} />
        </Group>
    </Panel>
);

EndGame.propTypes = {
    id: PropTypes.string.isRequired,
};

export default EndGame;
