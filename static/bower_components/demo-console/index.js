(function(window){
/* jshint node: true */
'use strict';

const reSpace = /\s/;

/**
  # demo-console

  Show a demo console when working with [requirebin](http://requirebin.com/?gist=6079475). Just
  include it in one of your require bin demos like this:

  ## Example Usage

  <<< demo/index.js

  ## Reference

**/

function Console(console)
{
  if(!(this instanceof Console))
    return new Console(console)

  console = console || window.console

  // ensure we have items
  var items = initConsole();

  this.log   = log.bind(items, console, 'log')
  this.info  = log.bind(items, console, 'info')
  this.error = log.bind(items, console, 'error')
  this.warn  = log.bind(items, console, 'warn')

  this.trace = function()
  {
    var stack = (new Error).stack

    log.apply(items, arguments.unshift(console, 'trace').push(stack));
  };
}

/**
  ### console.log()

  As per the browser `console.log` statement
**/
function log(console, level) {
  var items = this

  var item = document.createElement('li');

  var argv = [].slice.call(arguments, 2)

  // initialise the item
  item.innerHTML = argv.map(renderData).join(' ');

  // add the class
  item.classList.add(level);

  // add to the list
  items.appendChild(item);

  setTimeout(function() {
    items.parentNode.scrollTop = items.offsetHeight;
  }, 100);

  // pass the call through to the original window console
  console[level].apply(console, argv);
};

/* internals */

function initConsole() {
  // look for the container list
  var container;
  var list = document.querySelector('.democonsole ul');

  // if we found the list return it
  if (list) {
    return list;
  }

  // otherwise, go ahead and create it
  container = document.createElement('div');
  list = document.createElement('ul');

  // initialise stuff
  container.className = 'democonsole';
  container.appendChild(list);

  // add the console to the dom
  document.body.appendChild(container);

  return list;
}

function renderData(data, index) {
  var initialItem = index === 0;

  function extractData(key) {
    var hasSpace = reSpace.test(key);
    var quoteChar = hasSpace ? '\'' : '';

    var content = span(quoteChar + key + quoteChar, 'key') + span(': ')
                + renderData(data[key])

    return '<div data-type="object-key">' + content + '</div>';
  }

  if (typeof data == 'undefined') {
    return span('undefined', 'undefined');
  }
  if (data === true || data === false) {
    return span(data, 'boolean');
  }
  if (Array.isArray(data)) {
    return span('[') + data.map(function(entry) {
      return renderData(entry);
    }).join(', ') + span(']');
  }
  if (typeof data == 'string' || (data instanceof String)) {
    return span(initialItem ? data : ('\'' + data + '\''), 'string');
  }
  if (data === null) {
    return span('null', 'null');
  }
  if (data instanceof Error) {
    return span(data.toString(), 'error');
  }
  else if (data instanceof Window) {
    return span('window', 'window');
  }
  if (data instanceof DocumentType) {
    return 'doctype: ' + data.name;
  }
  if (data instanceof HTMLCollection) {
    return span('[]', 'html-collection');
  }
  if (data instanceof HTMLDocument) {
    return [].slice.call(document.childNodes).map(renderData);
  }
  if (data instanceof HTMLElement) {
    return data.tagName;
  }
  if (typeof data == 'object') {
    return '<div data-type="object">' + span('{') +
      Object.keys(data).map(extractData).join('<div class="comma-float">,</div>') +
      span('}') + '</div>';
  }

  return span(data, typeof data);
}

function span(content, dataType) {
  return '<span data-type="' + (dataType || '') + '">' + content + '</span>';
}


window.Console = Console
})(this)
