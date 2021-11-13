import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Dropdown from 'rc-dropdown/lib';
import Menu, { Item as MenuItem } from 'rc-menu/lib';

import { ArrowVerticalSvg } from 'assets/img/icons';
import { Button, Icon } from 'components';
import { languages } from 'config/constants/i18n';
import { OptionalClassNameProp } from 'typings';
import { ILanguages } from 'typings/i18n';

import 'rc-dropdown/assets/index.css';
import 'rc-menu/assets/index.css';
import './ant-override.scss';
import styles from './change-language.module.scss';

interface IMenuItemContentProps extends OptionalClassNameProp {
  name: string;
  icon: string;
}

const MenuItemContent: React.FC<IMenuItemContentProps> = ({ className, name, icon }) => {
  return (
    <div className={cn(className, 'text_14')}>
      <Icon>{icon}</Icon>
      {name}
    </div>
  );
};

const menuItems = Object.entries(languages).map(([langCode, icon]) => {
  return (
    <MenuItem key={langCode} className={styles.menuItem}>
      <MenuItemContent
        className={cn(styles.menuItemContent, 'text_upper')}
        name={langCode}
        icon={icon}
      />
    </MenuItem>
  );
});

interface IChangeLanguageProps {
  customClasses?: {
    menu?: string;
  };
}

const ChangeLanguage: React.FC<IChangeLanguageProps> = ({ customClasses = {} }) => {
  const { i18n } = useTranslation();

  const [isOpened, setIsOpened] = useState(false);

  const onSelect = ({ key }: { key: string }) => {
    // {key:String, item:ReactComponent, domEvent:Event, selectedKeys:String[]}
    i18n.changeLanguage(key);
  };

  const toggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div>
        <Dropdown
          trigger="click"
          overlay={
            <Menu
              className={cn(styles.menu, customClasses.menu)}
              selectedKeys={[i18n.resolvedLanguage]}
              onSelect={onSelect}
            >
              {menuItems}
            </Menu>
          }
          overlayClassName={styles.dropdownBody}
          placement="bottomRight"
          onVisibleChange={toggleDropdown}
        >
          <div>
            <Button>
              <div className={cn(styles.buttonContent, 'text_medium', 'text_14')}>
                <MenuItemContent
                  className={cn(styles.menuItemHeader, 'text_upper')}
                  name={i18n.resolvedLanguage}
                  icon={languages[i18n.resolvedLanguage as ILanguages]}
                />
                <div
                  className={cn(styles.arrowVertical, {
                    [styles.arrowVerticalActive]: isOpened,
                  })}
                >
                  {ArrowVerticalSvg}
                </div>
              </div>
            </Button>
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default ChangeLanguage;
