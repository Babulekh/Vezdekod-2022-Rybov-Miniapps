import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group } from '@vkontakte/vkui';

import Cards from '../components/Cards.js';
import GameButton from '../components/GameButton.js';

const Game = ({ id, makeTurn, playerNum, time }) => (
    <Panel id={id}>
        <PanelHeader>Игра</PanelHeader>
        <Group>
            <GameButton onClick={makeTurn} text="Передать ход" />
            <Cards cards={[`Ходит игрок №${playerNum}`, time ? `Времени осталось: ${time}` : "Время вышло!"]} />
        </Group>
    </Panel>
);

Game.propTypes = {
    id: PropTypes.string.isRequired,
    makeTurn: PropTypes.func.isRequired,
    playerNum: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
};

export default Game;
