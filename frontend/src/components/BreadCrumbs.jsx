import { Breadcrumb } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BreadcrumbList = styled(Breadcrumb.List)`
  margin-bottom: 20px;
  padding-left: 3px;
`;

const BreadCrumbs = () => {
  const path = window.location.pathname
    .split('/')
    .filter((x) => x !== 'admin')
    .filter(Boolean);
  
  const titleize = (str) => {
    return str
      .split(/(?=[A-Z])|_/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const depluralize = (str) => {
    const pluralRules = [
      { regex: /ies$/, replacement: 'y' },
      { regex: /s$/, replacement: '' },
    ];

    for (const rule of pluralRules) {
      if (rule.regex.test(str)) {
        return str.replace(rule.regex, rule.replacement);
      }
    }

    return str;
  }

  return (
    <Breadcrumb.Root>
      <BreadcrumbList>
        {path.map((item, index) => (
          <React.Fragment key={index}>
            <Breadcrumb.Item>
              {index < path.length - 1 ? (
                <Breadcrumb.Link as={Link} to={`/admin/${path.slice(0, index + 1).join('/')}`}>
                  {titleize(item)}
                </Breadcrumb.Link>
              ) : (
                <>{`${titleize(item)} ${titleize(depluralize(path[index - 1]))}`}</>
              )}
            </Breadcrumb.Item>

            {index < path.length - 1 && <Breadcrumb.Separator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb.Root>
  );
}

export default BreadCrumbs;