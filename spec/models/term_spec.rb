require 'rails_helper'

describe Term do
  it 'returns null if there are no terms in the database' do
    expect(Term).to receive(:count).and_return(0)
    expect(Term.get_term(1)).to eq nil
  end

  context '1 term in the database' do
    let(:mock_term) { double('term') }

    before do
      allow(Term).to receive(:count).and_return(1)
      allow(Term).to receive_message_chain('all.order').with(:created_at).and_return([mock_term])
    end

    it 'returns the term for round 0' do
      expect(Term.get_term(0)).to eq mock_term
    end

    it 'returns the term for round 1' do
      expect(Term.get_term(1)).to eq mock_term
    end

    it 'returns the term for round "1" passed as string' do
      expect(Term.get_term('1')).to eq mock_term
    end
  end

  context '3 terms in the database' do
    let(:mock_term_1) { double('term 1') }
    let(:mock_term_2) { double('term 2') }
    let(:mock_term_3) { double('term 3') }
    let(:terms)       { [mock_term_1, mock_term_2, mock_term_3] }

    before do
      allow(Term).to receive(:count).and_return(terms.count)
      allow(Term).to receive_message_chain('all.order').with(:created_at).and_return(terms)
    end

    it 'gets the modulus 1st term' do
      expect(Term.get_term(1)).to eq mock_term_1
    end

    it 'gets the modulus 2nd term' do
      expect(Term.get_term(2)).to eq mock_term_2
    end

    it 'gets the modulus 3rd term' do
      expect(Term.get_term(3)).to eq mock_term_3
    end

    it 'gets the modulus 99th term' do
      expect(Term.get_term(99)).to eq mock_term_3
    end
  end
end
