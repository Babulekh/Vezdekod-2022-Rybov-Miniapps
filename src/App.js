import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import SetPlayers from './panels/SetPlayers.js';
import RoleCard from './panels/RoleCard.js';
import Game from './panels/Game.js';
import EndGame from './panels/EndGame.js';

const App = () => {
    const [activePanel, setActivePanel] = useState('setPlayers');
    const [playersNum, setPLayersNum] = useState(3);
    const [players, setPlayers] = useState(Array(12).fill(''));
    const [playerNum, setPlayerNum] = useState(0);
    const [cards, setCards] = useState(['']);
    const [role, setRole] = useState('');
    const [time, setTime] = useState(60);
    const [playerTimer, setPLayerTimer] = useState();

    const locations = [
        'База террористов',
        'Самолёт',
        'Киностудия',
        'Ночной клуб',
        'Партизанский отряд',
        'Церковь',
        'Полярная станция',
        'Казино',
        'Супермаркет',
        'Спа-салон',
        'Банк',
        'Хоккейная арена',
        'Корпоративная вечеринка',
        'Отель',
        'Пассажирский поезд',
        'Школа',
        'Зоопарк',
        'Полицейский участок',
        'Театр',
        'Выставка настолок',
        'Больница',
        'Орбитальная станция',
        'Овощебаза',
        'Подводная лодка',
        'Пиратский корабль',
        'Цирк-шапито',
        'Ресторан',
        'Войско крестоносцев',
        'Университет',
        'Лунапарк',
        'Воинская часть',
        'Посольство',
        'Океанский лайнер',
        'Карнавал',
        'Пляж',
        'Станция техобслуживания',
    ];

    useEffect(() => {
        bridge.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
                document.body.attributes.setNamedItem(schemeAttribute);
            }
        });
    }, []);

    useEffect(() => {
        if (activePanel == 'game') {
            makeTurn();
        }
    }, [activePanel]);

    useEffect(() => {
        if (activePanel == 'game') {
            clearInterval(playerTimer);
            setTime(60);
            setPLayerTimer(
                setInterval(() => {
                    setTime((prevTime) => prevTime - 1);
                }, 1000)
            );
        }
    }, [playerNum]);

    useEffect(() => {
        if (time == 0) {
            bridge.send('VKWebAppFlashSetLevel', { level: 1 });
            setTimeout(() => {
                bridge.send('VKWebAppFlashSetLevel', { level: 0 });
            }, 1000);
            clearInterval(playerTimer);
        }
    }, [time]);

    const changePlayersNum = (e) => {
        setPLayersNum(Number(e.currentTarget.value));
    };

    const changePlayerName = (e) => {
        setPlayers((prevPlayers) => {
            const players = prevPlayers.slice();
            players.forEach((player, index) => {
                if (index == e.currentTarget.id) player = console.log(e.currentTarget.value);
                return player;
            });
            return players;
        });
    };

    const cardsDealing = () => {
        const spysQuantity = playersNum > 8 ? 2 : 1;
        const location = locations[Math.floor(Math.random() * locations.length)];
        let cards = Array(spysQuantity).fill('Шпион');

        for (let i = 0; i < playersNum - spysQuantity; i++) {
            cards.push(location);
        }
        cards.sort(() => Math.random() - 0.5);
        setCards(cards);
        setActivePanel('roleCard');
    };

    const showNextPlayer = () => {
        if (role) {
            setRole('');
            setPlayerNum((prevPlayerNum) => prevPlayerNum + 1);
            if (playerNum == playersNum - 1) {
                setPlayerNum(-1);
                setActivePanel('game');
                return;
            }
        } else {
            setRole(cards[playerNum]);
        }
    };

    const makeTurn = () => {
        if (playerNum >= playersNum - 1) {
            setActivePanel('endGame');
            return;
        }
        setPlayerNum((prevPlayerNum) => prevPlayerNum + 1);
    };

    return (
        <AdaptivityProvider>
            <AppRoot>
                <View activePanel={activePanel}>
                    <SetPlayers id="setPlayers" cardsDealing={cardsDealing} changePlayersNum={changePlayersNum} playersNum={playersNum} players={players} changePlayerName={changePlayerName} />
                    <RoleCard id="roleCard" showNextPlayer={showNextPlayer} role={role} />
                    <Game id="game" makeTurn={makeTurn} playerNum={playerNum + 1} time={time} />
                    <EndGame id="endGame" />
                </View>
            </AppRoot>
        </AdaptivityProvider>
    );
};

export default App;
