document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const color1 = document.getElementById('color1');
            const color2 = document.getElementById('color2');
            const angle = document.getElementById('angle');
            const angleValue = document.getElementById('angle-value');
            const patternSize = document.getElementById('pattern-size');
            const patternSizeValue = document.getElementById('pattern-size-value');
            const patternOpacity = document.getElementById('pattern-opacity');
            const patternOpacityValue = document.getElementById('pattern-opacity-value');
            const patternOptions = document.querySelectorAll('.pattern-option');
            const patternOverlay = document.querySelector('.pattern-overlay');
            const randomizeBtn = document.getElementById('randomize');
            const copyCssBtn = document.getElementById('copy-css');
            const cssOutput = document.getElementById('css-output');
            
            // Current pattern
            let currentPattern = 'dots';
            
            // Update background when controls change
            function updateBackground() {
                document.documentElement.style.setProperty('--primary-color', color1.value);
                document.documentElement.style.setProperty('--secondary-color', color2.value);
                document.documentElement.style.setProperty('--angle', `${angle.value}deg`);
                document.documentElement.style.setProperty('--pattern-size', `${patternSize.value}px`);
                document.documentElement.style.setProperty('--pattern-opacity', patternOpacity.value / 100);
                document.documentElement.style.setProperty('--pattern-color', `rgba(255, 255, 255, ${patternOpacity.value / 100})`);
                
                // Update pattern overlay
                patternOverlay.setAttribute('data-pattern', currentPattern);
                
                // Update displayed values
                angleValue.textContent = angle.value;
                patternSizeValue.textContent = patternSize.value;
                patternOpacityValue.textContent = patternOpacity.value;
                
                updateCssOutput();
            }
            
            // Update CSS output
            function updateCssOutput() {
                let patternCss = '';
                
                switch(currentPattern) {
                    case 'dots':
                        patternCss = `background-image: radial-gradient(rgba(255, 255, 255, ${patternOpacity.value / 100}) 2px, transparent 2px);
background-size: ${patternSize.value}px ${patternSize.value}px;`;
                        break;
                    case 'lines':
                        patternCss = `background-image: repeating-linear-gradient(
    ${angle.value}deg,
    rgba(255, 255, 255, ${patternOpacity.value / 100}),
    rgba(255, 255, 255, ${patternOpacity.value / 100}) 1px,
    transparent 1px,
    transparent calc(${patternSize.value}px / 2)
);`;
                        break;
                    case 'waves':
                        patternCss = `background-image: 
    radial-gradient(circle at 100% 50%, transparent 20%, rgba(255, 255, 255, ${patternOpacity.value / 100}) 21%, 
    rgba(255, 255, 255, ${patternOpacity.value / 100}) 34%, transparent 35%, transparent),
    radial-gradient(circle at 0% 50%, transparent 20%, rgba(255, 255, 255, ${patternOpacity.value / 100}) 21%, 
    rgba(255, 255, 255, ${patternOpacity.value / 100}) 34%, transparent 35%, transparent) 0 -50px;
background-size: ${patternSize.value}px calc(${patternSize.value}px * 1.33);`;
                        break;
                    case 'grid':
                        patternCss = `background-image: 
    linear-gradient(rgba(255, 255, 255, ${patternOpacity.value / 100}) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 1px, transparent 1px);
background-size: ${patternSize.value}px ${patternSize.value}px;`;
                        break;
                    case 'zigzag':
                        patternCss = `background: 
    linear-gradient(135deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 25%, transparent 25%) -50px 0,
    linear-gradient(225deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 25%, transparent 25%) -50px 0,
    linear-gradient(315deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 25%, transparent 25%),
    linear-gradient(45deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 25%, transparent 25%);
background-size: calc(${patternSize.value}px * 2) calc(${patternSize.value}px * 2);`;
                        break;
                    case 'hexagons':
                        patternCss = `background-image: 
    linear-gradient(120deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 50%, transparent 50%),
    linear-gradient(60deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 50%, transparent 50%),
    linear-gradient(0deg, rgba(255, 255, 255, ${patternOpacity.value / 100}) 50%, transparent 50%);
background-size: calc(${patternSize.value}px / 1.732) ${patternSize.value}px;`;
                        break;
                }
                
                const css = `.gradient-bg {
    background: linear-gradient(${angle.value}deg, ${color1.value}, ${color2.value});
}

.pattern-overlay {
    ${patternCss}
}`;
                
                cssOutput.textContent = css;
            }
            
            // Randomize settings
            function randomizeSettings() {
                color1.value = '#' + Math.floor(Math.random()*16777215).toString(16);
                color2.value = '#' + Math.floor(Math.random()*16777215).toString(16);
                angle.value = Math.floor(Math.random() * 361);
                patternSize.value = Math.floor(Math.random() * 181) + 20;
                patternOpacity.value = Math.floor(Math.random() * 61) + 20;
                
                // Random pattern
                const patterns = ['dots', 'lines', 'waves', 'grid', 'zigzag', 'hexagons'];
                const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
                selectPattern(randomPattern);
                
                updateBackground();
            }
            
            // Select pattern
            function selectPattern(pattern) {
                currentPattern = pattern;
                patternOptions.forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-pattern') === pattern) {
                        option.classList.add('active');
                    }
                });
                updateBackground();
            }
            
            // Copy CSS to clipboard
            function copyCssToClipboard() {
                const textarea = document.createElement('textarea');
                textarea.value = cssOutput.textContent;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                // Show feedback
                const originalText = copyCssBtn.textContent;
                copyCssBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyCssBtn.textContent = originalText;
                }, 2000);
            }
            
            // Event listeners
            color1.addEventListener('input', updateBackground);
            color2.addEventListener('input', updateBackground);
            angle.addEventListener('input', updateBackground);
            patternSize.addEventListener('input', updateBackground);
            patternOpacity.addEventListener('input', updateBackground);
            randomizeBtn.addEventListener('click', randomizeSettings);
            copyCssBtn.addEventListener('click', copyCssToClipboard);
            
            // Pattern selection
            patternOptions.forEach(option => {
                option.addEventListener('click', function() {
                    selectPattern(this.getAttribute('data-pattern'));
                });
            });
            
            // Initialize
            updateBackground();
        });