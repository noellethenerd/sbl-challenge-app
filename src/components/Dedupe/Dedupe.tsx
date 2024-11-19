import { Component } from 'react';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';

class Dedupe extends Component {

  displaySequences() { 
    return this.props.sequences.map(element => {
      return <div>
        {element}
      </div>
    });
  }

  findUniques() {
    let uniqueSeq = {};
    this.props.sequences.map(seq => {
      uniqueSeq[seq] ? uniqueSeq[seq] += 1 : uniqueSeq[seq] = 1
    });
    return Object.keys(uniqueSeq).map(seq => {
      return <div>{seq}: {uniqueSeq[seq]} Occurrence(s)</div>
    })
  }

  findBaseDifferences(str1: string, str2: string) {
    const maxLength = Math.max(str1.length, str2.length);
    const diff: string[] = [];

    Array.from({length: maxLength}).forEach((_, i)=>{
      if (str1[i] !== str2[i]) {
        diff.push(`Base ${i}: '${str1[i] || ' '} vs '${str2[i] || ' '}`);
      }
    });
    return diff;
  }

  findSeqWithThresh(threshold?) {
    let uniqueSeq = {};
    this.props.sequences.map(seq => {
      if (uniqueSeq[seq]) {
        uniqueSeq[seq] += 1;
      }
      else if (!uniqueSeq[seq] && Object.values(uniqueSeq).length != 0) {
        (this.findBaseDifferences(seq, Object.keys(uniqueSeq)[0])).length <= threshold ? uniqueSeq[Object.keys(uniqueSeq)[0]] += 1: uniqueSeq[seq] = 1;
    }
      else uniqueSeq[seq] = 1;
    })
    return Object.keys(uniqueSeq).map(seq => {
      return <div>{seq}: {uniqueSeq[seq]} Occurrence(s)</div>
    })
  }

  deduplicate(threshold?) {
    if (!threshold) {
      return this.findUniques() 
    }
    else {
      return this.findSeqWithThresh(threshold);
    }
}
  
  render() { 
    return (
      <div className="Dedupe">
        Deduplication
        <Accordion>
          <Accordion.Item eventKey="0">
            <AccordionHeader>
              Raw Sequences:
            </AccordionHeader>
            <Accordion.Body>
              <div style={{color: 'black'}}>
                {this.displaySequences()}
              </div>
            </Accordion.Body>
           </Accordion.Item>
        </Accordion>


        <Accordion>
          <Accordion.Item eventKey="0">
            <AccordionHeader>
              Unique Sequences:
            </AccordionHeader>
            <Accordion.Body>
              <div style={{color: 'black'}}>
                {this.deduplicate()}
              </div>
            </Accordion.Body>
           </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item eventKey="0">
            <AccordionHeader>
              Matching Sequences (Threshold=1):
            </AccordionHeader>
            <Accordion.Body>
              <div style={{color: 'black'}}>
                {this.deduplicate(1)}
              </div>
            </Accordion.Body>
           </Accordion.Item>
        </Accordion>

        <Accordion>
          <Accordion.Item eventKey="0">
            <AccordionHeader>
              Matching Sequences (Threshold=2):
            </AccordionHeader>
            <Accordion.Body>
              <div style={{color: 'black'}}>
                {this.deduplicate(2)}
              </div>
            </Accordion.Body>
           </Accordion.Item>
        </Accordion>

    </div>
    )
  }
}

export default Dedupe;

