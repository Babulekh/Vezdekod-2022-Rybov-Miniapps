import React from 'react';
import PropTypes from 'prop-types';

import { Group, Div, CardGrid, Card, Text } from '@vkontakte/vkui';

const Cards = ({ cards }) => (
    <Div>
        <Group mode="plain">
            <CardGrid size="l">
                {cards.map((card, index) => (
                    <Card mode="shadow" key={index}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: `calc(192px / ${cards.length})` }}>
                            <Text weight="semibold" style={{ fontSize: 24 }}>
                                {card}
                            </Text>
                        </div>
                    </Card>
                ))}
            </CardGrid>
        </Group>
    </Div>
);

Cards.propTypes = {
    cards: PropTypes.array.isRequired,
};

export default Cards;
