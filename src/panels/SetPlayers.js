import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group, Div, FormItem, NativeSelect, Input } from '@vkontakte/vkui';

import GameButton from '../components/GameButton.js';

const SetPlayers = ({ id, cardsDealing, changePlayersNum, playersNum, players, changePlayerName }) => (
    <Panel id={id}>
        <PanelHeader>Выбор игроков</PanelHeader>
        <Group>
            <GameButton onClick={cardsDealing} text="Начать игру" />
            <Div>
                <FormItem top="Выберите количество игроков">
                    <NativeSelect onChange={changePlayersNum}>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                        <option value={11}>11</option>
                        <option value={12}>12</option>
                    </NativeSelect>
                    <Group mode="plain">
                        {players.map((player, index) => {
                            if (index < playersNum) return <Input key={index} id={index} type="text" value={player} onChange={changePlayerName} />;
                        })}
                    </Group>
                </FormItem>
            </Div>
        </Group>
    </Panel>
);

SetPlayers.propTypes = {
    id: PropTypes.string.isRequired,
    cardsDealing: PropTypes.func.isRequired,
    changePlayersNum: PropTypes.func.isRequired,
    playersNum: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired,
    changePlayerName: PropTypes.func.isRequired,
};

export default SetPlayers;
