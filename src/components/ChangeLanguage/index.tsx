import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowVerticalSvg } from 'assets/img/icons';
import ruIcon from 'assets/img/icons/countries/russia.svg';
import enIcon from 'assets/img/icons/countries/uk.svg';
import cn from 'classnames';
import { Button, Icon } from 'components';
import Dropdown from 'rc-dropdown/lib';
import Menu, { Item as MenuItem } from 'rc-menu/lib';
import { OptionalClassNameProp } from 'typings';

import 'rc-dropdown/assets/index.css';
import 'rc-menu/assets/index.css';
import './ant-override.scss';
import styles from './change-language.module.scss';

const languages = [
  {
    name: 'ru',
    icon: ruIcon,
  },
  {
    name: 'en',
    icon: enIcon,
  },
];

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

const menuItems = languages.map(({ name, icon }) => {
  return (
    <MenuItem key={name} className={styles.menuItem}>
      <MenuItemContent className={cn(styles.menuItemContent)} name={name} icon={icon} />
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

  const [selectedLang, selectLang] = useState(languages[0].name);

  const onSelect = ({ key }: { key: string }) => {
    // {key:String, item:ReactComponent, domEvent:Event, selectedKeys:String[]}
    i18n.changeLanguage(key);
    selectLang(key);
  };

  const language = languages.find(({ name }) => name === selectedLang) || languages[0];

  return (
    <>
      <div>
        <Dropdown
          overlay={
            <Menu
              className={cn(styles.dropdown, customClasses.menu)}
              defaultSelectedKeys={[selectedLang]}
              onSelect={onSelect}
            >
              {menuItems}
            </Menu>
          }
          placement="bottomRight"
        >
          <div>
            <Button>
              <div className={cn(styles.buttonContent, 'text_medium text_14')}>
                {/* className={styles.} */}
                <MenuItemContent
                  className={styles.menuItemHeader}
                  name={language.name}
                  icon={language.icon}
                />
                {ArrowVerticalSvg}
              </div>
            </Button>
          </div>
        </Dropdown>
      </div>
    </>
  );
};

export default ChangeLanguage;
