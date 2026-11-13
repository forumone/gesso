import parse from 'html-react-parser';

import { withGlobalWrapper } from '../../../.storybook/decorators.jsx';
import listTemplate from './facet-list.twig';
import facetTemplate from '../facet/facet.twig';
import globalData from '../../../source/00-config/storybook.global-data.yml';
import data from './facet-list.yml';
import '../facet/facet.source.scss';
// Facet markup (via facet.twig) includes gesso:icon.
import '../icon/icon.stories.jsx';
import './facet-list.source.scss';
import componentInfo from './facet-list.component.yml';
import getArgTypesFromComponent from '../../../.storybook/getArgTypesFromComponent.js';

const baseArgTypes = getArgTypesFromComponent(componentInfo, {
  hideArgs: globalData,
  hide: ['facets', 'item_modifier_classes'],
});

const settings = {
  title: 'Components/Facets/Facet List',
  decorators: [withGlobalWrapper],
  argTypes: {
    ...baseArgTypes,
    list_type: {
      ...baseArgTypes.list_type,
      options: ['ul', 'ol'],
      control: { type: 'select' },
    },
  },
};

const FacetList = {
  render: args => {
    const facets = (args.facets_data || data.facets_data).map(item => {
      // Render the child facets if there are any.
      if (item.children) {
        const childFacets = item.children.map(child => {
          return {
            value: facetTemplate({
              ...args,
              ...child,
              modifier_classes: 'c-facet--secondary',
            }),
          };
        });
        const childList = listTemplate({
          facets: childFacets,
          ...args,
        });

        return {
          value: `${facetTemplate({ ...args, ...item })} ${childList}`,
          is_expanded: true,
        };
      }

      return {
        value: facetTemplate({ ...args, ...item }),
        is_expanded: false,
      };
    });

    return parse(
      listTemplate({
        facets,
        ...args,
      })
    );
  },
  args: { ...globalData, ...data },
};

export default settings;
export { FacetList };
