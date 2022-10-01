/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';

const useOutsideClickDetector = function (surfaceSelectors: string, handler: Function, dependencies: React.DependencyList | undefined = undefined) {

    useLayoutEffect(() => {

        const bodyClickHandler = ({ target }: MouseEvent) => {

            const surfaces = Array.from(document.querySelectorAll(surfaceSelectors));

            let isOutside = true;

            if (!surfaces || surfaces.length === 0) return;

            surfaces.forEach((surface) => {

                if (surface.contains(target as Element)) isOutside = false;

            });

            if (isOutside) handler();

        };

        document.body.addEventListener('click', bodyClickHandler);

        return () => document.body.removeEventListener('click', bodyClickHandler);

    }, dependencies);

};

export { useOutsideClickDetector };
