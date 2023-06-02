import React, { useRef, useState } from 'react';
import Accordion from '@/_ui/Accordion';
import { EventManager } from '../EventManager';
import { renderElement } from '../Utils';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { SearchBox } from '@/_components/SearchBox';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';
import _ from 'lodash'
// eslint-disable-next-line import/no-unresolved
// import * as Icons from '@tabler/icons-react';
import * as Icons from '@ant-design/icons';
import { VirtuosoGrid } from 'react-virtuoso';

export function Avatars({ componentMeta, darkMode, ...restProps }) {
    const {
        layoutPropertyChanged,
        component,
        dataQueries,
        paramUpdated,
        currentState,
        eventsChanged,
        apps,
        allComponents,
        pages,
    } = restProps;

    const [searchText, setSearchText] = useState('');
    const [showPopOver, setPopOverVisibility] = useState(false);
    const iconList = useRef(Object.keys(_.pickBy(Icons, (item) =>
        item?.render ? true : false
    )));
    const searchIcon = (text) => {
        if (searchText === text) return;
        setSearchText(text);
    };

    const filteredIcons =
        searchText === ''
            ? iconList.current
            : iconList.current.filter((icon) => icon?.toLowerCase().includes(searchText ? searchText.toLowerCase() : ''));

    const onIconSelect = (icon) => {
        paramUpdated({ name: 'icon' }, 'value', icon, 'properties');
    };

    const eventPopover = () => {
        return (
            <Popover
                id="popover-basic"
                style={{ width: '460px', maxWidth: '460px' }}
                className={`${darkMode && 'popover-dark-themed theme-dark'} shadow icon-widget-popover`}
            >
                <Popover.Header>
                    <SearchBox onSubmit={searchIcon} width="100%" placeholder='搜索' />
                </Popover.Header>
                <Popover.Body>
                    <div className="row">
                        {
                            <VirtuosoGrid
                                style={{ height: 300 }}
                                totalCount={filteredIcons.length}
                                listClassName="icon-list-wrapper"
                                itemClassName="icon-list"
                                itemContent={(index) => {
                                    if (filteredIcons[index] === undefined || filteredIcons[index] === 'createReactComponent')
                                        return null;
                                    // eslint-disable-next-line import/namespace
                                    const IconElement = Icons[filteredIcons[index]];
                                    return (
                                        <div
                                            className="ant-icon-element p-2"
                                            onClick={() => {
                                                onIconSelect(filteredIcons[index]);
                                                setPopOverVisibility(false);
                                            }}
                                        >
                                            <IconElement
                                                color={`${darkMode ? '#fff' : '#000'}`}
                                                stroke={1.5}
                                                strokeLinejoin="miter"
                                                style={{ width: '24px', height: '24px' }}
                                                alt='fg'
                                                title={filteredIcons[index]}
                                            />
                                        </div>
                                    );
                                }}
                            />
                        }
                    </div>
                </Popover.Body>
            </Popover>
        );
    };

    function renderIconPicker() {
        const icon = component.component.definition.properties.icon;
        // eslint-disable-next-line import/namespace
        const IconElement = Icons[icon.value];
        return (
            <>
                <div className="mb-2 field">
                    <label className="form-label">图标</label>
                </div>
                <div className="card mb-3">
                    <div className="card-body p-0" style={{display:'flex',justifyContent:'space-between'}}>
                        <div className="field">
                            <OverlayTrigger
                                trigger="click"
                                placement={'left'}
                                show={showPopOver}
                                onToggle={(showing) => setPopOverVisibility(showing)}
                                rootClose={true}
                                overlay={eventPopover()}
                            >
                                <div className="row p-2" role="button">
                                    <div className="col-auto">
                                        <IconElement
                                            color={`${darkMode ? '#fff' : '#000'}`}
                                            stroke={2}
                                            strokeLinejoin="miter"
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                    </div>
                                    <div className="col text-truncate">{icon.value}</div>
                                </div>

                            </OverlayTrigger>
                        </div>
                        <CopyToClipboard
                            text={icon.value}
                            onCopy={() => {
                                toast.success('已复制', { position: 'top-center' });
                            }}
                        >
                            <button className="btn">
                                复制
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
            </>
        );
    }

    let items = [];


    items.push({
        title: '属性',
        children: (
            <>
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'src',
                    'properties',
                    currentState,
                    allComponents
                )}
                {renderIconPicker()}
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'title',
                    'properties',
                    currentState,
                    allComponents
                )}
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'counts',
                    'properties',
                    currentState,
                    allComponents
                )}
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'shape',
                    'properties',
                    currentState,
                    allComponents
                )}
            </>
        )
    });

    items.push({
        title: '事件处理',
        isOpen: false,
        children: (
            <EventManager
                component={component}
                componentMeta={componentMeta}
                currentState={currentState}
                dataQueries={dataQueries}
                components={allComponents}
                eventsChanged={eventsChanged}
                apps={apps}
                darkMode={darkMode}
                pages={pages}
            />
        ),
    });

    items.push({
        title: '常规',
        isOpen: true,
        children: (
            <>
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'tooltip',
                    'general',
                    currentState,
                    allComponents
                )}
            </>
        ),
    });

    items.push({
        title: '布局',
        isOpen: true,
        children: (
            <>
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'showOnDesktop',
                    'others',
                    currentState,
                    allComponents
                )}
                {renderElement(
                    component,
                    componentMeta,
                    layoutPropertyChanged,
                    dataQueries,
                    'showOnMobile',
                    'others',
                    currentState,
                    allComponents
                )}
            </>
        ),
    });

    return <Accordion items={items} />;
}
