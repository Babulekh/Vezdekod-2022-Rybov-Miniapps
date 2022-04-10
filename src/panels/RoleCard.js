import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, Group } from '@vkontakte/vkui';

import Cards from '../components/Cards.js';
import GameButton from '../components/GameButton.js';

const RoleCard = ({ id, role, showNextPlayer }) => (
    <Panel id={id}>
        <PanelHeader>Карта</PanelHeader>
        <Group>
            <GameButton onClick={showNextPlayer} text={role ? 'Скрыть карту' : 'Показать карту'} />
            <Cards cards={[role]} />
        </Group>
    </Panel>
);

RoleCard.propTypes = {
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    showNextPlayer: PropTypes.func.isRequired,
};

export default RoleCard;
